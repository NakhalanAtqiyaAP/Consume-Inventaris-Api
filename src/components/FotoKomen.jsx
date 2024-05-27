import React from 'react';

const ProfilePhoto = ({ src, alt }) => {
  return (
    <img
      alt={alt}
      src={src}
      className="size-14 rounded-full object-cover"
    />
  );
};

export default ProfilePhoto;
