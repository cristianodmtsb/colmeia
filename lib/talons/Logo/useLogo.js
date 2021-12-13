import { useQuery } from '@apollo/react-hooks';

export const useLogo = props => {
  const { query, defaultWidth, defaultHeight, defaultAlt, fallback } = props;
  const { data, loading } = useQuery(query);

  let logoSrc;
  if (
    data &&
    data.storeConfig &&
    !data.storeConfig.header_logo_src &&
    !loading
  ) {
    logoSrc = fallback;
  }

  if (data && data.storeConfig && data.storeConfig.header_logo_src) {
    logoSrc = `${data.storeConfig.secure_base_media_url}logo/${data.storeConfig.header_logo_src}`;
  }

  if (loading) {
    logoSrc = null;
  }

  return {
    src: logoSrc,
    logoWidth:
      (data && data.storeConfig && data.storeConfig.logo_width) || defaultWidth,
    logoHeight:
      (data && data.storeConfig && data.storeConfig.logo_height) ||
      defaultHeight,
    alt: (data && data.storeConfig && data.storeConfig.logo_alt) || defaultAlt,
  };
};
