import Swal from 'sweetalert2';

export const fileUpload = async (file: File): Promise<string | undefined> => {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/jose4125/image/upload';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');

  try {
    const cloudinaryData = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: formData,
    });

    if (cloudinaryData.ok) {
      const cloudinaryJson = await cloudinaryData.json();
      return cloudinaryJson.secure_url;
    }

    throw new Error('Claudinary error when trying to upload the image');
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Oops...', text: error.message });
  }
};
