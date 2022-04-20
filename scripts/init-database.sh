curl 'https://api.notion.com/v1/databases/'"$DATABASE_ID"'' \
  -H 'Authorization: Bearer '"$NOTION_API_SECRET"'' \
  -H 'Notion-Version: 2022-02-22' | grep -q 'Tags'
if [ $? -ne 0 ]; then
  echo "データベースの列名「タグ」を「Tags」に変更してください。詳細は README をご覧ください。"
  exit 1
fi

curl --location --request PATCH 'https://api.notion.com/v1/databases/'"$DATABASE_ID"'' \
--header 'Authorization: Bearer '"$NOTION_API_SECRET"'' \
--header 'Content-Type: application/json' \
--header 'Notion-Version: 2022-02-22' \
--data '{
    "properties": {
        "title": {
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
  -H "Notion-Version: 2022-02-22" \
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
				"rich_text": [
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
