import { useSelector } from 'react-redux';


const StickyBar = () => {
  const maxListings = 16;

  const localCartData = useSelector((state) => {
    const data = state.cart.localCart;
    return Array.isArray(data) ? data : JSON.parse(data || '[]');
  });
 
  const progress = (localCartData.length / maxListings) * 100;
  return (
    <>
      <div
        className="sticky-progress-bar"
        style={{
          position: 'fixed',    
          bottom: '0',          
          left: '0',
          right: '0',
          backgroundColor: '#f1f1f1',
          padding: '10px',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,         
        }}
      >
        <div
          className="progress-bar-container"
          style={{
            backgroundColor: '#e0e0e0',
            borderRadius: '5px',
            height: '30px',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            className="progress-bar"
            style={{
              width: `${progress}%`,
              backgroundColor: '#4caf50',
              height: '100%',
              borderRadius: '5px',
              transition: 'width 0.4s ease-in-out',
            }}
          ></div>
        </div>

        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          {localCartData.length} / {maxListings} Listings added
        </div>

        {localCartData.length < maxListings ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#666',
            }}
          >
            {maxListings - localCartData.length} more to add
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#28a745',
            }}
          >
            All listings added!
          </div>
        )}
      </div>
    </>
  );
};

export default StickyBar;