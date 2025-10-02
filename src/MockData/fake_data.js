

// Mock Blocks based on the schema
export const MockBlocks = [
  // Contact Block
  {
    "_id": "contact-block-1",
    "_type": "link",
    "_rev": "abc123def456",
    "_createdAt": "2025-10-01T09:00:00Z",
    "_updatedAt": "2025-10-01T10:30:00Z",
    "title": "Get in Touch",
    "email": "alexandra@leykauf.com"
  },

  // Info Block with Text and Images
  {
    "_id": "info-block-1",
    "_type": "info",
    "_rev": "def456ghi789",
    "_createdAt": "2025-09-28T14:00:00Z",
    "_updatedAt": "2025-10-01T08:15:00Z",
    "title": "Recent Works",
    "components": [
      {
        "_type": "textComponent",
        "_key": "text-intro-1",
        "content": "These pieces explore the intersection of digital and physical spaces, questioning our relationship with technology and nature.",
        "style": "normal"
      },
      {
        "_type": "imageComponent",
        "_key": "image-comp-1",
        "images": [
          {
            "_key": "img-1",
            "asset": {
              "_ref": "image-17-picsum",
              "_type": "reference"
            },
            "alt": "Mixed media installation with digital projections",
            "legend": "Digital Nature - An exploration of artificial ecosystems through mixed media and projection mapping",
            "facts": [
              {
                "_key": "fact-1",
                "label": "Year",
                "value": "2025"
              },
              {
                "_key": "fact-2",
                "label": "Medium",
                "value": "Mixed media, digital projection"
              },
              {
                "_key": "fact-3",
                "label": "Dimensions",
                "value": "300 x 200 x 150 cm"
              },
              {
                "_key": "fact-4",
                "label": "Location",
                "value": "Berlin Contemporary Gallery"
              }
            ]
          },
          {
            "_key": "img-2",
            "asset": {
              "_ref": "image-22-picsum",
              "_type": "reference"
            },
            "alt": "Detail view of texture and light interaction",
            "legend": "Close-up detail showing the interplay between organic textures and digital light patterns",
            "facts": [
              {
                "_key": "fact-5",
                "label": "Technique",
                "value": "Layered acrylic with LED integration"
              },
              {
                "_key": "fact-6",
                "label": "Series",
                "value": "Digital Nature Series"
              }
            ]
          }
        ]
      },
      {
        "_type": "textComponent",
        "_key": "text-process-1",
        "content": "The creative process involves a dialogue between traditional painting techniques and cutting-edge technology.",
        "style": "blockquote"
      }
    ]
  },

  // Info Block with Videos
  {
    "_id": "info-block-2",
    "_type": "info",
    "_rev": "ghi789jkl012",
    "_createdAt": "2025-09-25T11:00:00Z",
    "_updatedAt": "2025-09-30T16:45:00Z",
    "title": "Process Documentation",
    "components": [
      {
        "_type": "textComponent",
        "_key": "text-video-intro",
        "content": "Behind the scenes of my latest installation process",
        "style": "h2"
      },
      {
        "_type": "videoComponent",
        "_key": "video-comp-1",
        "videos": [
          {
            "_key": "vid-1",
            "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "title": "Studio Process: Digital Nature Installation",
            "thumbnail": {
              "_ref": "video-thumb-1",
              "_type": "reference"
            },
            "legend": "Three-week documentation of the creation process from initial sketches to final installation",
            "facts": [
              {
                "_key": "vid-fact-1",
                "label": "Duration",
                "value": "12:34"
              },
              {
                "_key": "vid-fact-2",
                "label": "Date Filmed",
                "value": "September 2025"
              },
              {
                "_key": "vid-fact-3",
                "label": "Location",
                "value": "Artist Studio, Berlin"
              },
              {
                "_key": "vid-fact-4",
                "label": "Equipment",
                "value": "Canon R5, DJI Ronin"
              }
            ]
          },
          {
            "_key": "vid-2",
            "url": "https://vimeo.com/123456789",
            "title": "Time-lapse: 72 Hours of Creation",
            "thumbnail": {
              "_ref": "video-thumb-2",
              "_type": "reference"
            },
            "legend": "Condensed view of three days of intensive work on the central piece",
            "facts": [
              {
                "_key": "vid-fact-5",
                "label": "Duration",
                "value": "3:45"
              },
              {
                "_key": "vid-fact-6",
                "label": "Format",
                "value": "4K Time-lapse"
              },
              {
                "_key": "vid-fact-7",
                "label": "Frame Rate",
                "value": "1 frame every 30 seconds"
              }
            ]
          }
        ]
      }
    ]
  },

  // Mixed Info Block with Text, Images, and Videos
  {
    "_id": "info-block-3",
    "_type": "info",
    "_rev": "jkl012mno345",
    "_createdAt": "2025-09-20T13:00:00Z",
    "_updatedAt": "2025-10-01T12:00:00Z",
    "title": "Exhibition: Synthetic Landscapes",
    "components": [
      {
        "_type": "textComponent",
        "_key": "text-exhibition-intro",
        "content": "Synthetic Landscapes",
        "style": "h1"
      },
      {
        "_type": "textComponent",
        "_key": "text-exhibition-description",
        "content": "This exhibition presents a series of works that blur the boundaries between natural and artificial environments. Each piece invites viewers to reconsider their perception of authenticity in our increasingly digital world.",
        "style": "normal"
      },
      {
        "_type": "imageComponent",
        "_key": "exhibition-images",
        "images": [
          {
            "_key": "exhibition-img-1",
            "asset": {
              "_ref": "exhibition-view-1",
              "_type": "reference"
            },
            "alt": "Gallery view of Synthetic Landscapes exhibition",
            "legend": "Main gallery space showing the complete installation with visitor interaction",
            "facts": [
              {
                "_key": "ex-fact-1",
                "label": "Exhibition Dates",
                "value": "Oct 15 - Dec 20, 2025"
              },
              {
                "_key": "ex-fact-2",
                "label": "Venue",
                "value": "Museum of Contemporary Art"
              },
              {
                "_key": "ex-fact-3",
                "label": "Curator",
                "value": "Dr. Maria Schmidt"
              }
            ]
          }
        ]
      },
      {
        "_type": "videoComponent",
        "_key": "exhibition-video",
        "videos": [
          {
            "_key": "exhibition-vid-1",
            "url": "https://www.youtube.com/watch?v=exhibition123",
            "title": "Exhibition Walkthrough",
            "thumbnail": {
              "_ref": "exhibition-video-thumb",
              "_type": "reference"
            },
            "legend": "Guided tour through the exhibition with artist commentary",
            "facts": [
              {
                "_key": "ex-vid-fact-1",
                "label": "Duration",
                "value": "8:22"
              },
              {
                "_key": "ex-vid-fact-2",
                "label": "Languages",
                "value": "English, German subtitles"
              }
            ]
          }
        ]
      }
    ]
  },

  // Empty Block
  {
    "_id": "empty-block-1",
    "_type": "empty",
    "_rev": "mno345pqr678",
    "_createdAt": "2025-10-01T15:00:00Z",
    "_updatedAt": "2025-10-01T15:00:00Z"
  },

  // Another Contact Block
  {
    "_id": "contact-block-2",
    "_type": "link",
    "_rev": "pqr678stu901",
    "_createdAt": "2025-09-30T10:00:00Z",
    "_updatedAt": "2025-10-01T09:00:00Z",
    "title": "Studio Visits",
    "url": "https://leykauf.com/studio-visits"
  }
];
