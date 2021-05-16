import json
import os
import time
import boto3
from boto3.dynamodb.conditions import Key

region = os.environ['REGION_NAME']

def lambda_handler(event, context):
    rek = boto3.client('rekognition', region_name=region)

    bucket_name_trigger = event['Records'][0]['s3']['bucket']['name']
    object_key_trigger = event['Records'][0]['s3']['object']['key']

    # In case the collections does not exists, return HTTP404 NOT FOUND
    if os.environ['FACE_COLLECTION'] not in rek.list_collections()['CollectionIds']:
        return {"statusCode": 404, "message": json.dumps(f"Collection with id {os.environ['FACE_COLLECTION']} not found")}

    response = rek.search_faces_by_image(
        CollectionId=os.environ['FACE_COLLECTION'],
        Image={
            'S3Object':{
                'Bucket': bucket_name_trigger,
                'Name': object_key_trigger
            }
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

        # Store user info on new log entry
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
        except Exception:
            return {"statusCode": 403, "message": json.dumps("User not registered") }

        return {"statusCode": 200, "message": json.dumps(f"FaceId [{faceMatch['Face']['FaceId']} was found with {faceMatch['Similarity']:.2f}%]")}