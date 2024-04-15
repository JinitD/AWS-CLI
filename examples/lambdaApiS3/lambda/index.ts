import AWS from 'aws-sdk';
export type respuesta = {
    imagen: string;
};

export const handler = async (eventevent: any, context: any) => {
    try {
        const s3 = new AWS.S3();
        const body: respuesta = JSON.parse(eventevent.body)
        if (!body) {
            return {
                statusCode: 400,
                body: JSON.stringify({  statusCode: 400,message: 'Se esperaba un cuerpo de imagen en el evento.' })
            };
        }

        const imageBodyBase64 = body.imagen;
        const folderName = "jhoan-dorado"
        const imageBody = Buffer.from(imageBodyBase64, "base64");

        const params = {
            Bucket: 'test-buckt/' + folderName,
            Key: 'imagen-jdorado.jpg',
            Body: imageBody
        };

        await s3.upload(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ statusCode: 200, message: `Imagen guardada exitantemente en ${folderName}` })
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            body: JSON.stringify({ statusCode: 500, message: 'Error mi loco D:' })
        };
    }
};
