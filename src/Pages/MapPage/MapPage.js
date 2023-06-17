import MapComponent from '../../Components/MapComp/Maps';
import Navigation from '../../Components/Navigation/Navigation';

const MapPage = () => {
  return (
    <>
      <Navigation />

      <div className='map-comp' style={{ width: '100vw', height: '100vh' }}>
        <MapComponent />
      </div>
    </>
  );
};

export default MapPage;
