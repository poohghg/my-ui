interface AvatarProps {
  url: string;
  name?: string;
}

export const Avatar = ({ name = '', url }: AvatarProps) => (
  <div className="rounded" onMouseOver={() => console.log('focused')}>
    <img src={url} alt={name} title={name} />
  </div>
);
