import WaveGridBackground from '../Components/3D/WaveGridBackground';
import ClaimFormOverlay from '../Components/Form/ClaimFormOverlay';
import DateGrid from '../Components/Form/DateGrid';

const Claim = () => {
  return (
    <>
      {/* Persistent animated background */}
      <WaveGridBackground />
      {/* Scroll snap container */}
      <div
        className="claim-scroll-container"
        style={{
          height: '100vh',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
        }}
      >
        <section
          className="claim-hero-section"
          style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
            zIndex: 10,
            scrollSnapAlign: 'start',
          }}
        >
          <ClaimFormOverlay />
        </section>
        <section
          className="claim-second-section"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            position: 'relative',
            scrollSnapAlign: 'start',
          }}
        >
          <DateGrid />
        </section>
      </div>
    </>
  );
};

export default Claim;
