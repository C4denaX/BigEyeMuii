import json, boto3, os, base64
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    region = os.environ['REGION_NAME']

    # Get DynamoDB resources
    dyn = boto3.resource('dynamodb', region_name=region)
    s3 = boto3.client('s3')

    access_log = dyn.Table(os.environ['ACCESS_LOG_TABLE'])
    
    # Scan all items
    users = access_log.scan().get('Items', [])
    
    for user in users:
        # Add thumnail URL
        user['thumbnail'] = base64.b64encode(s3.get_object(Bucket=os.environ['THUMBNAIL_BUCKET'], Key=f"{user['faceId']}.png")['Body'].read()).decode('utf-8')

        user['records'] = [str(record) for record in user['records']]

    return {
        "isBase64Encoded": False,
        "statusCode": 200,
        "headers": {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps({"records": users})
    }