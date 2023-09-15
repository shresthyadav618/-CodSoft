import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { IncomingForm } from 'formidable';
import fs from "fs";
import mime from "mime-types";
import { NextResponse } from 'next/server';
import { join } from 'path';
import { isAdminCheck } from "../auth/[...nextauth]/route";
await isAdminCheck();
export async function POST(NextRequest) {
  const form = new IncomingForm();
  form.uploadDir = './public/uploads'; // Set the directory to store uploads

  try {
   const formData = await NextRequest.formData();
    const file = formData.get('file');
    console.log("form-data",file,formData);
    

    // const bytes = await file.arrayBuffer();
    // console.log(bytes);
    // file.arrayBuffer().then((buffer)=>{
    //   console.log('buffer is : ',buffer);
    // })
    // const buffer = Buffer.from(bytes);
    // console.log('new buffer is : ',buffer);
    const path = join('/','tmp',file.name);
    // await writeFile(path,buffer);
    // console.log(`open ${path} to see the file`);
    // console.log('the file.path is equal to : ',file.path);

    const ext = file.name.split('.')[1];
    const newFilename = Date.now() + '.' + ext;
    // console.log('the ext and newFileName is : ',ext,' and ',newFilename);
    // console.log(process.env.S3_ACCESS_KEY,process.env.S3_SECRET_KEY);
    const links = [];
    const client = new S3Client({
      region : 'eu-north-1',
      credentials : {
        accessKeyId : process.env.S3_ACCESS_KEY,
        secretAccessKey : process.env.S3_SECRET_KEY 
      }
    });
    await client.send(new PutObjectCommand({
      Bucket : 'manu-ecommerce-admin',
      Key: newFilename,
      Body: fs.readFileSync(path),
      ACL: 'public-read',
      ContentType: mime.lookup(path),

    }));
    const link = `https://manu-ecommerce-admin.s3.amazonaws.com/${newFilename}`;
    links.push(link);
    console.log(link,links);
    return NextResponse.json(links);
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      status: 500,
      error: err.message,
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
