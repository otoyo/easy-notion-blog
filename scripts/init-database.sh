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
