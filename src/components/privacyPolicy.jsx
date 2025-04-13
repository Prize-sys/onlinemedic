import React from 'react'
import privacyPolicy from '../utils/privacyPolicy.json' // Import the privacy policy data from a JSON file
import styles from '../assets/styles/policy.module.css' // Import CSS module for styling

function PrivacyPolicyContainer() {
  return (
    <div className={styles.bodyContainer}> {/* Main container for the privacy policy */}
      {privacyPolicy.sections.map((section, index) => (
        <div key={index} className={styles.section}> {/* Section wrapper */}
          
          {/* Render section title if it exists */}
          {section.title && <h3 className={styles.sectionTitle}>{section.title}</h3>}

          {/* Render section content if it exists */}
          {section.content && <p className={styles.sectionContent}>{section.content}</p>}

          {/* Render section list if it exists and has items */}
          {section.list && section.list.length > 0 && (
            <ul className={styles.sectionList}>
              {section.list.map((item, listIndex) => (
                <li key={listIndex} className={styles.listItem}>{item}</li>
              ))}
            </ul>
          )}

          {/* Render subsections if they exist and contain data */}
          {section.subsections && section.subsections.length > 0 && (
            section.subsections.map((subsection, subIndex) => (
              <div key={subIndex} className={styles.subsection}> {/* Subsection wrapper */}
                
                {/* Render subsection title if it exists */}
                {subsection.title && (
                  <h4 className={styles.subsectionTitle}>{subsection.title}</h4>
                )}

                {/* Render subsection content if it exists */}
                {subsection.content && (
                  <p className={styles.subsectionContent}>{subsection.content}</p>
                )}

                {/* Render subsection list if it exists and has items */}
                {subsection.list && subsection.list.length > 0 && (
                  <ul className={styles.list}>
                    {subsection.list.map((item, listIndex) => (
                      <li key={listIndex} className={styles.listItem}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  )
}

export default PrivacyPolicyContainer // Export the component for use in other parts of the application