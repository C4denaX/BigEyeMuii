import json, base64
import os
import time
import boto3
from boto3.dynamodb.conditions import Key

region = os.environ['REGION_NAME']

def lambda_handler(event, context):
    rek = boto3.client('rekognition', region_name=region)

    # Request's image (encoded as base64 bytes)
    b64_thumbnail = base64.b64decode(
        # Loads request's body dictionary
        json.loads(
            # Decode body as UTF-8 characters (encode first to get bytes, then decode as UTF-8)
            event['body'].encode().decode('utf-8')
        )['thumbnail'].encode()
    )

    # In case the collections does not exists, return HTTP404 NOT FOUND
    if os.environ['FACE_COLLECTION'] not in rek.list_collections()['CollectionIds']:
        return {"statusCode": 404, "message": json.dumps(f"Collection with id {os.environ['FACE_COLLECTION']} not found")}

    # Search face in Rekognition collection
    response = rek.search_faces_by_image(
        CollectionId=os.environ['FACE_COLLECTION'],
        Image={
            'Bytes': b64_thumbnail
        },
        MaxFaces=1
    )

    if not response['FaceMatches']:
        # In case no face with similarity above 90% was found on collections, return HTTP403 FORBIDDEN
        return {"statusCode": 403, "message": json.dumps("Face not registered with threshold above 80%") }
    else:
        # If a face was found with similarity above 90%, retrieves user info
        faceMatch = response['FaceMatches'][0]

        dyn = boto3.resource('dynamodb', region_name=region)
        dyn_log_table = dyn.Table(os.environ['ACCESS_LOG_TABLE'])

        # Register access by updating user entry
        try:
            dyn_log_table.update_item(
                Key={
                    'faceId': faceMatch['Face']['FaceId']
                },
                UpdateExpression="SET records = list_append(records, :ts)",
                ConditionExpression="faceId = :faceId",
                ExpressionAttributeValues={
                    ':ts': [json.dumps(round(time.time()*1000))],
                    ':faceId': faceMatch['Face']['FaceId']
                }
            )

        # In case of exception (no key was found - user is not registered) returns HTTP403 Forbidden
        except Exception:
            return {
                "statusCode": 403,
                "body": json.dumps({"message": json.dumps("User not registered") })
            }

        # Otherwise, entry was updated, return HTTP200 SUCCESSFUL
        return {
                "statusCode": 200,
                "body": json.dumps({"message": f"FaceId [{faceMatch['Face']['FaceId']}] was found with {faceMatch['Similarity']:.2f}%"})
            }