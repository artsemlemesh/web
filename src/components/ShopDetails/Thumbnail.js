const Thumbnail = ({ items, handleSelect }) => {
  return (
    <div className="flex items-center">
      {items.map((item, index) => (
        <img
          key={index}
          src={item.images[0]?.image_small}
          alt={`Image ${index + 1}`}
          onClick={() => handleSelect(item)}
          style={{
            border: '4px solid black',
            cursor: 'pointer',
            margin: '5px',
            width: '100px', // Adjust the width as needed
            height: 'auto', //
          }}
        />
      ))}
    </div>
  )
}

export default Thumbnail
