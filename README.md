# Game7 Technical Task - Weapon Inventory System

## Requirements
- Create a REST or GraphQL API for managing the weapon inventory system.
- Design a database schema to store weapon inventory data, including items, characters, and perks.
- The inventory belongs to only one user.
- Inventory items (Weapons, Armors and more) can have their own perks, such as fire resistance, lightning resistance, and void resistance.
- Items may be duplicated in the inventory, including duplicates with the same perk.
- Implement functionality to transfer items between players.
- Implement functionality to discard items from the inventory.
- Allow users to equip one or more items from the inventory.

## Bonus
- Additionally, implementing unit tests or end-to-end tests using either Vite or Jest
- Implement Docker

## Installation

Use the docker to run mongo database.

```
docker compose up
```

Use the node package manager [npm] to install node_modules.

```bash
npm install
npm start
```

## Usage

To check the results, please use Postman and following Google Docs.
https://docs.google.com/document/d/19deLixsWjVTcZRFbQmipFSOFk_wVx2HASi5h8VDxc2M/edit

Use this document to understand database schemas and API endpoints.

## License

[MIT](https://choosealicense.com/licenses/mit/)