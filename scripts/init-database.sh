curl --location --request PATCH 'https://api.notion.com/v1/databases/'"$DATABASE_ID"'' \
--header 'Authorization: Bearer '"$NOTION_API_SECRET"'' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2021-08-16' \
--data '{
    "properties": {
        "Name": {
            "name": "Page"
        },
        "Slug": {
            "rich_text": {}
        },
        "Date": {
            "date": {}
        },
        "Excerpt": {
            "rich_text": {}
        },
        "OGImage": {
            "files": {}
        },
        "Rank": {
            "number": {}
        },
        "Published": {
            "checkbox": {}
        }
    }
}'

curl 'https://api.notion.com/v1/pages' \
  -H 'Authorization: Bearer '"$NOTION_API_SECRET"'' \
  -H "Content-Type: application/json" \
  -H "Notion-Version: 2021-08-16" \
  --data '{
	"parent": { "database_id": "'"$DATABASE_ID"'" },
	"properties": {
		"Page": {
			"title": [
				{
					"text": {
              "content": "My 1st post"
					}
				}
			]
		},
		"Excerpt": {
			"rich_text": [
				{
					"text": {
						"content": "This is an excerpt."
					}
				}
			]
		},
    "Slug": {
			"rich_text": [
				{
					"text": {
						"content": "my-first-post"
					}
				}
			]
    },
    "Date": {
        "date": {
            "start": "2021-11-03"
        }
    },
		"Tags": {
			"multi_select": [
          { "name": "Diary" }
      ]
		},
    "Published": {
        "checkbox": true
    },
		"Rank": { "number": 1 }
	},
	"children": [
		{
			"object": "block",
			"type": "paragraph",
			"paragraph": {
				"text": [
					{
						"type": "text",
						"text": {
							"content": "This is my first post."
						}
					}
				]
			}
		}
	]
}'
