#![no_std]


use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Map, String, Symbol, Vec};



#[contracttype]
#[derive(Debug, PartialEq, Eq, Clone)]
pub struct Item {
    pub id: u32,
    pub name: String,
    pub price: i128, // token amount
    pub quantity: u32,
    pub seller: Address,
    pub image_url: String, // New field for image link
}

#[contract]
pub struct Marketplace;

const ITEM_COUNTER: Symbol = symbol_short!("I_COUNTER");
const ITEMS: Symbol = symbol_short!("ITEMS");

#[contractimpl]
impl Marketplace {
    /// Seller lists a new item
    pub fn list_item(
        env: Env,
        seller: Address,
        name: String,
        price: i128,
        quantity: u32,
        image_url: String // Image URL from AWS, Cloudinary, IPFS, etc.
    ) -> u32 {
        if price <= 0 || quantity == 0 {
            panic!("Invalid price or quantity");
        }

        let mut counter: u32 = env.storage().instance().get(&ITEM_COUNTER).unwrap_or(0);
        counter += 1;

        let item = Item {
            id: counter,
            name,
            price,
            quantity,
            seller: seller.clone(),
            image_url,
        };

        // let mut items: Vec<Item> = env.storage().persistent().get(&ITEMS).unwrap_or(Vec::new(&env));
        let mut items: Map<u32, Item> = env.storage().persistent().get(&ITEMS).unwrap_or(Map::new(&env));
        items.set(counter, item);
        env.storage().instance().set(&ITEMS, &items);
        env.storage().instance().set(&ITEM_COUNTER, &counter);

         env.events()
            .publish(("list",), &counter);
        counter
    }

    /// Retrieve all items
    pub fn get_items(env: Env) -> Vec<Item> {
        let items: Map<u32, Item> = env.storage().instance().get(&ITEMS).unwrap_or(Map::new(&env));
        let mut list = Vec::new(&env);
        for id in items.keys() {
            list.push_back(items.get(id).unwrap());
        }
        list
    }

    /// Buy item (qty units)
    pub fn buy_item(env: Env, buyer: Address, item_id: u32, qty: u32) {
        let mut items: Map<u32, Item> = env.storage().instance().get(&ITEMS).unwrap_or(Map::new(&env));
        let mut item = items.get(item_id).unwrap();

        if qty == 0 || qty > item.quantity {
            panic!("Invalid quantity");
        }

        // Payment logic to be added later

        item.quantity -= qty;
        items.set(item_id, item.clone());
        env.storage().persistent().set(&ITEMS, &items);

         env.events()
            .publish(("buy",), (&buyer, &item_id));
    }
}
