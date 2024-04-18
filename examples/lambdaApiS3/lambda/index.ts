import AWS from 'aws-sdk';
export type respuesta = {
    imagen: string;
};

export const handler = async (event: any, context: any) => {
    try {
        console.log("esto es evetn: ", event)
        console.log("esto es body: ", event.body)

        if (!event.imagen) {
            return {
                statusCode: 400,
                body: { message: 'Se esperaba un cuerpo de imagen en el evento.' }
            };
        }

        const body: respuesta = event
        console.log(body)
        const imageBodyBase64 = body.imagen;
        const folderName = "jhoan-dorado"
        console.log(folderName)

        const imageBody = Buffer.from(imageBodyBase64, "base64");
        console.log(imageBody)

        const params = {
            Bucket: 'jdorado-test/' + folderName,
            Key: 'imagen-jdorado.jpg',
            Body: imageBody
        };
        const s3 = new AWS.S3();
        await s3.upload(params).promise();

        return {
            statusCode: 200,
            body: { message: `Imagen guardada exitantemente en ${folderName}` }
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: { message: 'Error mi loco D:' ,
                error: error
            }
        };
    }
};
