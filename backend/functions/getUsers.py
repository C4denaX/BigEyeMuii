import json, boto3, os
from boto3.dynamodb.conditions import Key

def lambda_handler(event, context):
    region = os.environ['REGION_NAME']

    # Get DynamoDB resources
    dyn = boto3.resource('dynamodb', region_name=region)
    access_log = dyn.Table(os.environ['ACCESS_LOG_TABLE'])
    
    # Scan all items
    users = access_log.scan().get('Items', [])
    
    for user in users:
        # Add thumnail URL
        user['thumbnail'] = f"https://{os.environ['THUMBNAIL_BUCKET']}.s3.amazonaws.com/{user['faceId']}.png"
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