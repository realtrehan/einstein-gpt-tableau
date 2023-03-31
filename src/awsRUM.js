import { AwsRum } from 'aws-rum-web';


export let awsRum = null;

//with aws rahultrehan.com RUM app monitoring

try {
  const config = {
    sessionSampleRate: 1,
    guestRoleArn: "arn:aws:iam::254435831602:role/RUM-Monitor-us-east-1-254435831602-9696430320861-Unauth",
    identityPoolId: "us-east-1:3f9852f4-fdad-46c4-aec4-df9d8f397629",
    endpoint: "https://dataplane.rum.us-east-1.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID = 'ff3f41ea-13d4-4655-abb1-feffe84ec3ce';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'us-east-1';

   awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
} catch (error) {
  // Ignore errors thrown during CloudWatch RUM web client initialization
}

//end of AWS RUM app monitoring
