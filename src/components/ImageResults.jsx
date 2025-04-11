export default function ImageResults({ images, onSelect }) {
  return (
    <div className="image-grid">
      {images.map((img) => (
        <div key={img.id} className="image-card">
          <img src={img.src.medium} alt={img.alt} />
          <div style={{ padding: "10px" }}>
            <button onClick={() => onSelect(img.src.large)}>
              Add Captions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
