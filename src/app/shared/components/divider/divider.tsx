export default function Divider({ size }: {size: 'xs'| 's'| 'md' | 'lg'}) {
  const heigth = {
    'xs': 5,
    's': 15,
    'md': 30,
    'lg': 60
  };

  return (
    <div style={{
      width: '100%',
      height: heigth[size],
    }}/>

  );
};
