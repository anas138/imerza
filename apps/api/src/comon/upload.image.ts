import * as aws from 'aws-sdk';
aws.config.update({ region: `${process.env.REGION}` });
export const uploadImage = async (
  file,
  sizes: string,
  projectRoot: string,
  cb,
) => {
  const id = (Math.random() + 1).toString(36).substring(7);
  const s3 = new aws.S3({
    //endpoint: `${process.env.ENDPOINT}`,
    region: `${process.env.AWS_REGION}`,
    credentials: new aws.Credentials({
      accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
      secretAccessKey: `${process.env.AWS_SECERET_ACCESS_KEY}`,
    }),
  });
  aws.config.region = `${process.env.REGION}`;
  return new Promise((resolve, reject) => {
    s3.putObject(
      {
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Key: `assets/${projectRoot}/images/${id}-${sizes}.jpg`,
        Body: file,
        ACL: `${process.env.ACL}`,
      },
      async (err, data) => {
        if (err) return console.log(err, 'error');
        else {
          const url = `https://${process.env.AWS_BUCKET_NAME}.s3.us-west-2.amazonaws.com/assets/${projectRoot}/images/${id}-${sizes}.jpg`;
          //cb(url);
          resolve(url);
        }
      },
    );
  });

  // Read app.json file
};

export const getImage = () => {
  const s3 = new aws.S3({
    //endpoint: `${process.env.ENDPOINT}`,
    region: `${process.env.AWS_REGION}`,
    credentials: new aws.Credentials({
      accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
      secretAccessKey: `${process.env.AWS_SECERET_ACCESS_KEY}`,
    }),
  });
  aws.config.region = `${process.env.REGION}`;
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: `${process.env.AWS_BUCKET_NAME}`,
        Key: `assets/77charlton/logo.png`,
      },
      async (err, data) => {
        if (err) return console.log(err, 'error');
        else {
          const d = data.Body.toString("base64");
          resolve(d)
        }
      },
    );
  });
};

// Key: `${process.env.FILE_LOCATION}/${id}/${name}/${sizes}`,
// const url = `https://${process.env.BUCKET_NAME}.nyc3.digitaloceanspaces.com/${process.env.FILE_LOCATION}/${id}/${name}/${sizes}`;
//https://imerzaassets.s3.us-west-2.amazonaws.com/assets/allen/images/z8baqactual
