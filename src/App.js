import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageResults from "./components/ImageResults";
import CanvasEditor from "./components/CanvasEditor";
import { fetchImages } from "./utils/fetchImages";
import "./styles.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (query) => {
    const results = await fetchImages(query);
    setImages(results);
  };

  return (
    <div className="container">
      <h1>🎨 Fabric Image Editor</h1>
      {!selectedImage ? (
        <>
          <SearchBar onSearch={handleSearch} />
          <ImageResults images={images} onSelect={setSelectedImage} />
        </>
      ) : (
        <CanvasEditor
          imageUrl={selectedImage}
          goBack={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
