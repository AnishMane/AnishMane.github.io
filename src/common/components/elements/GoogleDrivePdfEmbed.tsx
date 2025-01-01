interface GoogleDrivePdfEmbedProps {
  src: string;
  width?: string;
  height?: string;
}

const GoogleDrivePdfEmbed: React.FC<GoogleDrivePdfEmbedProps> = ({
  src,
  width = '100%',
  height = '800px',
}) => {
  return (
    <iframe
      src={`https://drive.google.com/file/d/${getFileIdFromUrl(src)}/preview`}
      title="Google Drive PDF Viewer"
      width={width}
      height={height}
      frameBorder="0"
      scrolling="no"
    >
      This browser does not support embedding Google Drive PDFs. Please use a
      compatible browser.
    </iframe>
  );
};

const getFileIdFromUrl = (url: string): string => {
  const match = url.match(/\/file\/d\/(.*?)\/(view|preview|edit)/);
  return match ? match[1] : '';
};

export default GoogleDrivePdfEmbed;
