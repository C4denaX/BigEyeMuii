import boto3, os, base64, json
from PIL import Image
from io import BytesIO

def lambda_handler(event, context):
    request_body = json.loads(event['body'].encode().decode('utf-8'))

    rek = boto3.client('rekognition', region_name=os.environ['REGION_NAME'])
    s3 = boto3.client('s3')
    dyn = boto3.resource('dynamodb', region_name=os.environ['REGION_NAME'])
    access_log = dyn.Table(os.environ['ACCESS_LOG_TABLE'])

    b64_thumbnail = request_body['thumbnail']

    response = rek.index_faces(
        CollectionId=os.environ['FACE_COLLECTION'],
        Image={
            'Bytes': base64.b64decode(b64_thumbnail.encode('utf-8'))
        },
        MaxFaces=1
    )

    statusCode = None
    body = None

    if response['FaceRecords']:
        faceId = response['FaceRecords'][0]['Face']['FaceId']
        filename = f"{faceId}.png"

        img_thumbnail = Image.open(BytesIO(base64.b64decode(b64_thumbnail)))
        img_thumbnail.save(f"/tmp/{filename}", format='png')

        s3.upload_file(
            Filename=f"/tmp/{filename}",
            Bucket=os.environ['THUMBNAIL_BUCKET'],
            Key=filename
        )

        access_log.put_item(
            Item={
                'faceId': faceId,
                'name': request_body['name'],
                'records': []
            }
        )

        statusCode = 200
        body = {"message": f"{request_body['name']} [{faceId}] successfully registered"}

    else:
        statusCode = 404
        body = {"msg": "No face was found"}
        
    return {
        "statusCode": statusCode if statusCode else 404,
        "body": json.dumps(body if body else "Not found")
    }