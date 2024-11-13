import { Carousel } from 'react-responsive-carousel'

const styles = {
  itemDescription: {
    fontSize: 14,
    fontVariant: ['small-caps'],
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    color: 'black',
  },
}

export default function ImageList({ selectedItem }) {
  return (
    <div>
      <Carousel showThumbs={false} autoPlay={false} selectedItem={0}>
        {selectedItem &&
          selectedItem.images &&
          selectedItem.images.map((image) => (
            <div
              style={{
                backgroundImage: 'url(' + image.image_large + ')',
                aspectRatio: 0.9,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 1,
                  left: 1,
                }}
              >
                <div className="bg-white p-md-3 p-xs-1" style={{ opacity: '0' }}>
                  <p style={styles.itemDescription}>{selectedItem.size.name}</p>
                  <p style={styles.itemDescription}>{selectedItem.brand.name}</p>
                  <p style={styles.itemDescription}>{selectedItem.quality}</p>
                </div>
              </div>
              <img></img>
            </div>
          ))}
      </Carousel>
    </div>
  )
}
