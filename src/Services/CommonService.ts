import imageCompression from 'browser-image-compression';

export const convertFile = (file: File): Promise<string> => {
    return new Promise((resolve,reject) => {
        let reader = new FileReader()
        // Resolve the Base64 string result
        reader.onload = () => { 
            if(typeof reader.result === 'string'){
                resolve(reader.result);
            }
        }
        // Reject if error occurs
        reader.onerror = () => { 
            reject(reader.error) 
        }
        // Read the file
        reader.readAsDataURL(file);
    })
}

export const compressImage = async(file: File): Promise<File> => {
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    //console.log('originalFile instanceof Blob', file instanceof Blob); // true
    //console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
    const compressedFile = await imageCompression(file, options);
    //console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    //console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    return compressedFile;
}