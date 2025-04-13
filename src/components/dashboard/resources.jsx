import React, { useState, useEffect } from "react";
import { useApp } from "../../context/appContext";
import styles from "../../assets/styles/dashboard/resources.module.css";

function Resources() {
  // State to track the selected category (default is "Books")
  const [selectedCategory, setSelectedCategory] = useState("Books");
  // State to store the fetched resources
  const [resources, setResources] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // Extract getResources function from the app context
  const { getResources } = useApp();

  useEffect(() => {
    // Function to fetch resources from the database
    const fetchResources = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        // Fetch resources based on the selected category
        const querySnapshot = await getResources(selectedCategory.toLowerCase());

        // Map the fetched data into an array of resource objects
        const fetchedResources = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update state with fetched resources
        setResources(fetchedResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchResources();
  }, [selectedCategory]); // Re-run effect when selectedCategory changes

  return (
    <div className={styles.resources}>
      <h4>Helpful Resources</h4>

      {/* Category Selection Buttons */}
      <div className={styles.categoryButtons}>
        <button
          className={`button ${selectedCategory === "Books" ? styles.active : ""}`}
          onClick={() => setSelectedCategory("Books")}
        >
          Books
        </button>
        <button
          className={`button ${selectedCategory === "Articles" ? styles.active : ""}`}
          onClick={() => setSelectedCategory("Articles")}
        >
          Articles
        </button>
      </div>

      {/* Display Resources */}
      <div className={styles.resourceList}>
        {loading ? (
          <p>Loading resources...</p> // Show loading message while fetching data
        ) : resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource.id} className={styles.resourceItem}>
              <h3>{resource.title}</h3>
              <p className={styles.recommended}>Recommended for: {resource.therapyCategory}</p>
              <p className={styles.description}>{resource.description}</p>
              {selectedCategory === "Books" ? (
                // Display download button for books
                <a href={resource.fileURL} target="_blank" download>
                  <button>Download</button>
                </a>
              ) : (
                // Display external link for articles
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Read Article</button>
                </a>
              )}
            </div>
          ))
        ) : (
          <p>No resources available!</p> // Display message if no resources are found
        )}
      </div>

      {/* External links for more resources */}
      <div className={styles.externalLinks}>
        <p>Find more books at <a href="https://ru.pdfdrive.com/" target="_self" rel="noopener noreferrer">PDF Drive→</a></p>
        <p>Find more articles at <a href="https://scholar.google.com/" target="_self" rel="noopener noreferrer">Google Scholar→</a></p>
      </div>
    </div>
  );
}

export default Resources;
