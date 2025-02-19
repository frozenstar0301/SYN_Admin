import React, { useEffect, useState } from 'react';

interface Props {
  font: {
    url: string;
    name: string;
  };
}

export const FontLoader: React.FC<Props> = ({ font }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const fontFace = new FontFace(font.name, `url(${font.url})`);
      
      fontFace.load()
        .then((loadedFont) => {
          document.fonts.add(loadedFont);
          setLoaded(true);
        })
        .catch((error) => {
          console.error(`Error loading font ${font.name}:`, error);
        });
    }
  }, [font.url, font.name, loaded]);

  return null;
};