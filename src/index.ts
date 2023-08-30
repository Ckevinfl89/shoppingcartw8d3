import { v4 as uuidv4 } from "uuid";


type Item = {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

type User = {
    id: string;
    name: string;
    age: number;
    cart: Item[];
}

const sup = createUser('Mr. Superman', 35);
const boxenOfDoughnuts = createItem('Boxen of Doughnuts', 7.99, 'Just like moosen or micen')
const canOpener = createItem('The opener of cans', 1.99, 'Has spinny blades with handles')
const cheese = createItem('Tillamook is the best', 8.99, 'Medium. Solid creamy goodness.')

function createUser(name: string, age: number): User {
    return {
        id: uuidv4(),
        name,
        age,
        cart: [],
    };
}

function createItem(name: string, price: number, description: string): Item {
    return {
        id: uuidv4(),
        name,
        price,
        description,
        quantity: 1,
    };
}

function addToCart(user: User, item: Item) {
    const existingItem = user.cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        user.cart.push(item);
    }
}

function removeFromCart(user:User, item:Item) {
    user.cart = user.cart.filter((cartItem) => cartItem.id !== item.id);
    console.log("\n****************************************\n\nAFTER REMOVAL...HERE IS YOUR UPDATED CART\n\n****************************************\n")
}

function removeQuantityFromCart(user: User, item: Item, quantity: number): void {
    const itemIndex = user.cart.findIndex(cartItem => cartItem.id === item.id);
    if (itemIndex !== -1) {
        if (user.cart[itemIndex].quantity <= quantity) {
            user.cart.splice(itemIndex, 1);
        } else {
            user.cart[itemIndex].quantity -= quantity;
        }
    }
}

function cartTotal(user: User): number {
    return user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function printSeparator() {
    console.log("----------------------------------------");
}

function printCart(user: User) {
    printSeparator();   
    console.log(`Receipt for ${user.name}: \n`);

    user.cart.forEach((item) => {
        console.log(`${item.name} (x${item.quantity}) - Price: $${item.price.toFixed(2)}`);
    });

    console.log(`\nTotal: $${cartTotal(user).toFixed(2)}`);
    printSeparator();
}

addToCart(sup, boxenOfDoughnuts);
addToCart(sup, boxenOfDoughnuts);
addToCart(sup, boxenOfDoughnuts);
addToCart(sup, boxenOfDoughnuts);
addToCart(sup, canOpener);
addToCart(sup, cheese);
addToCart(sup, cheese);


printCart(sup);

removeFromCart(sup, canOpener);
printCart(sup);

removeQuantityFromCart(sup, boxenOfDoughnuts, 3)
printCart(sup);