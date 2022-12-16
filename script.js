const ingredients = new Set([
    "Abecean Longfin",
    "Ancestor Moth Wing",
    "Ash Creep Cluster",
    "Ash Hopper Jelly",
    "Ashen Grass Pod",
    "Bear Claws",
    "Bee",
    "Beehive Husk",
    "Bleeding Crown",
    "Blisterwort",
    "Blue Butterfly Wing",
    "Blue Dartwing",
    "Blue Mountain Flower",
    "Boar Tusk",
    "Bone Meal",
    "Briar Heart",
    "Burnt Spriggan Wood",
    "Butterfly Wing",
    "Canis Root",
    "Charred Skeever Hide",
    "Chaurus Eggs",
    "Chaurus Hunter Antennae",
    "Chicken's Egg",
    "Creep Cluster",
    "Crimson Nirnroot",
    "Cyrodilic Spadetail",
    "Daedra Heart",
    "Deathbell",
    "Dragon's Tongue",
    "Dwarven Oil",
    "Ectoplasm",
    "Elves Ear",
    "Emperor Parasol Moss",
    "Eye of Sabre Cat",
    "Falmer Ear",
    "Felsaad Tern Feathers",
    "Fire Salts",
    "Fly Amanita",
    "Frost Mirriam",
    "Frost Salts",
    "Garlic",
    "Giant Lichen",
    "Giant's Toe",
    "Gleamblossom",
    "Glow Dust",
    "Glowing Mushroom",
    "Grass Pod",
    "Hagraven Claw",
    "Hagraven Feathers",
    "Hanging Moss",
    "Hawk Beak",
    "Hawk Feathers",
    "Hawk's Egg",
    "Histcarp",
    "Honeycomb",
    "Human Flesh",
    "Human Heart",
    "Ice Wraith Teeth",
    "Imp Stool",
    "Jazbay Grapes",
    "Juniper Berries",
    "Large Antlers",
    "Lavender",
    "Luna Moth Wing",
    "Moon Sugar",
    "Mora Tapinella",
    "Mudcrab Chitin",
    "Namira's Rot",
    "Netch Jelly",
    "Nightshade",
    "Nirnroot",
    "Nordic Barnacle",
    "Orange Dartwing",
    "Pearl",
    "Pine Thrush Egg",
    "Poison Bloom",
    "Powdered Mammoth Tusk",
    "Purple Mountain Flower",
    "Red Mountain Flower",
    "River Betty",
    "Rock Warbler Egg",
    "Sabre Cat Tooth",
    "Salmon Roe",
    "Salt Pile",
    "Scaly Pholiota",
    "Scathecraw",
    "Silverside Perch",
    "Skeever Tail",
    "Slaughterfish Egg",
    "Slaughterfish Scales",
    "Small Antlers",
    "Small Pearl",
    "Snowberries",
    "Spawn Ash",
    "Spider Egg",
    "Spriggan Sap",
    "Swamp Fungal Pod",
    "Taproot",
    "Thistle Branch",
    "Torchbug Thorax",
    "Trama Root",
    "Troll Fat",
    "Tundra Cotton",
    "Vampire Dust",
    "Void Salts",
    "Wheat",
    "White Cap",
    "Wisp Wrappings"
])
const effectsLibrary = new Set([
    "Cure Disease",
    "Cure Poison",
    "Damage Health",
    "Damage Magicka",
    "Damage Magicka Regen",
    "Damage Stamina",
    "Damage Stamina Regen",
    "Fear",
    "Fortify Archery",
    "Fortify Alteration",
    "Fortify Barter",
    "Fortify Block",
    "Fortify Carry Weight",
    "Fortify Conjuration",
    "Fortify Destruction",
    "Fortify Enchanting",
    "Fortify Health",
    "Fortify Heavy Armor",
    "Fortify Illusion",
    "Fortify Light Armor",
    "Fortify Lockpicking",
    "Fortify Magicka",
    "Fortify Marksman",
    "Fortify One-handed",
    "Fortify Pickpocket",
    "Fortify Restoration",
    "Fortify Smithing",
    "Fortify Sneak",
    "Fortify Stamina",
    "Fortify Two-handed",
    "Frenzy",
    "Invisibility",
    "Light",
    "Lingering Damage Health",
    "Lingering Damage Magicka",
    "Lingering Damage Stamina",
    "Night Eye",
    "Paralysis",
    "Ravage Health",
    "Ravage Magicka",
    "Ravage Stamina",
    "Regenerate Health",
    "Regenerate Magicka",
    "Regenerate Stamina",
    "Resist Fire",
    "Resist Frost",
    "Resist Magic",
    "Resist Poison",
    "Resist Shock",
    "Restore Health",
    "Restore Magicka",
    "Restore Stamina",
    "Slow",
    "Spell Absorption",
    "Waterbreathing",
    "Weakness to Fire",
    "Weakness to Frost",
    "Weakness to Magic",
    "Weakness to Poison",
    "Weakness to Shock"
])
const bestMatches = new Map();
let sortedBestMatches

class Ingredient {

    constructor (name, savedEffects, failedCombinations) {
        this.name = name
        this.id = this.name.replaceAll(" ", "")
        this.effects = savedEffects
        this.failedCombinations = failedCombinations
    }

    addEffect = (effect, index) => {
        if (effectsLibrary.has(effect)) {
            this.effects[index] = effect
        } else if (effect == "") {
            this.effects[index] = null
        } else {
            console.log(`${effect} does not exist`);
        }
    }

    addFailedCombination = (otherIngredient) => {
        const tempFailedCombinations = new Set(this.failedCombinations)

        tempFailedCombinations.add(otherIngredient.name)

        this.failedCombinations = Array.from(tempFailedCombinations).sort()
    }

    removeFailedCombination = (otherIngredient) => {
        const failedCombinations = new Set(this.failedCombinations)

        failedCombinations.delete(otherIngredient.name)

        this.failedCombinations = Array.from(failedCombinations).sort()
    }

    getFailedEffects = () => {
        const failedEffects = new Set()

        // Check if all four of the effects are discovered
        if (!this.effects.includes(null) && this.effects.length == 4) return [];

        for (let failedIngredient of this.failedCombinations) {
            failedEffects.add(...failedIngredient.effects)
        }

        return Array.from(failedEffects).sort()
    }

    getFailedCombinations = () => {
        // Create a Set from this.failedCombinations (which removes duplicates)
        // Convert back to an array, sort it, and return the array.
        return Array.from(new Set(this.failedCombinations)).sort()
    }
}

class AlchemyList {
    constructor () {
        this.container = []
        this.recommendations = []
    }

    isEmpty = () => {
        return this.container.length > 0 ? false : true
    }

    saveAlchemyListToStorage = () => {
        window.localStorage.clear()
        window.localStorage.setItem('AlchemyList', JSON.stringify(this.container))
    }

    getAlchemyListFromStorage = (storageItem) => {
        try {
            for (let ingredient of JSON.parse(window.localStorage.getItem(storageItem))) {
                this.container.push( new Ingredient (
                    ingredient.name,
                    ingredient.effects,
                    ingredient.failedCombinations
                ))
            }
        } catch (e) {
            console.log(e);
        }
    }

    createAlchemyList = () => {
        for (let ingredient of ingredients) {
            this.container.push( new Ingredient (ingredient, [], []))
        }
        window.localStorage.setItem("AlchemyList", JSON.stringify(this.container))
    }

    getIngredient = (ingredientName) => {
        return this.container.find(ingredient => ingredient.name === ingredientName)
    }

    getIngredientById = (ingredientId) => {
        return this.container.find(ingredient => ingredient.id === ingredientId)
    }

    getFailedEffectsOf = (ingredientObject) => {
        let otherIngredientObject
        let failedEffects = new Set()

        for (let otherIngredient of ingredientObject.failedCombinations) {

            otherIngredientObject = this.getIngredient(otherIngredient)

            for (let effect of otherIngredientObject.effects) {
                if (!effect) continue;
                failedEffects.add(effect)
            }
        }
        return Array.from(failedEffects).sort()
    }

    getUntestedEffectsOf = (ingredientObject) => {
        const untestedEffects = new Set(effectsLibrary)

        try {
            if (ingredientObject.effects.includes(null) || ingredientObject.effects.length < 4) {
                for (const effect of ingredientObject.effects) {
                    untestedEffects.delete(effect)
                }

                for (const effect of this.getFailedEffectsOf(ingredientObject)) {
                    untestedEffects.delete(effect)
                }

                return Array.from(untestedEffects).sort()
            }
            return ["All Effects Known"]
        } catch (e) {
            console.log(e);
            console.log(`Input value not recognized, try checking spelling`);
        }
    }

    getRecommendedCombination = (ingredient) => {
        let bestMatch = null, bestCount = 0, discoverableEffects

        try {
            bestMatches.clear()

            for (let otherIngredient of this.container) {
                discoverableEffects = 0

                // Count number of effects that the alchemyItem HAS compared to the ingredient untested effects list
                for (let effect of otherIngredient.effects) {
                    if (this.getUntestedEffectsOf(ingredient).includes(effect)) {
                        bestMatches.set(otherIngredient.name, bestMatches.get(otherIngredient.name) + 1 || 1)
                        discoverableEffects++
                    }
                }

                if (discoverableEffects > bestCount) {
                    bestCount = discoverableEffects
                    bestMatch = otherIngredient
                }
            }
            sortedBestMatches = new Map([...bestMatches].sort((a, b) => b[1] - a[1]));
            this.recommendations = sortedBestMatches.keys()

            document.getElementById("nextMatch").classList.remove("inactive")
            document.getElementById("bestMatch").innerHTML = `The best match is ${this.recommendations.next().value}`
        } catch (e) {
            document.getElementById("nextMatch").classList.add("inactive")
            document.getElementById("bestMatch").innerHTML = ``
        }

    }
}

class Viewer {
    constructor () {
        this.ingredientInput = document.getElementById("ingredientName")
        this.inputEffects = [
            document.getElementById("effect0"),
            document.getElementById("effect1"),
            document.getElementById("effect2"),
            document.getElementById("effect3")
        ]
        this.failedCombinationInput = document.getElementById("failedCombinationInput")
        this.failedCombinations = document.getElementById("failedCombinations")
        this.untestedEffects = document.getElementById("untestedEffectsList")
        this.failedEffects = document.getElementById("failedEffectsList")
    }

    clear = () => {
        this.inputEffects[0].value = ""
        this.inputEffects[1].value = ""
        this.inputEffects[2].value = ""
        this.inputEffects[3].value = ""
        this.failedCombinationInput.value = ""
        this.failedCombinations.innerHTML = ""
        this.untestedEffects.innerHTML = ""
        this.failedEffects.innerHTML = ""
    }

    update = (ingredient, alchemyList) => {
        let untestedEffectsArray

        this.clear()

        if (ingredient) {

            // Display Effects
            ingredient.effects.map((effect, index) => { this.inputEffects[index].value = effect || "" })

            // Display Combinations
            ingredient.getFailedCombinations().map(otherIngredient => { this.failedCombinations.innerHTML += `<li id='failedCombination-${otherIngredient.replaceAll(" ", "")}'>${otherIngredient}<span>x</span></li>`; })

            // Display Untested Effects
            alchemyList.getUntestedEffectsOf(ingredient).map( effect => { this.untestedEffects.innerHTML += `<li>${effect}</li>` })

            // Display Failed Effects
            alchemyList.getFailedEffectsOf(ingredient).map( effect => { this.failedEffects.innerHTML += `<li>${effect}</li>` })

            // Recommendations
            alchemyList.getRecommendedCombination(ingredient)
        }
    }
}




const main = () => {

    // Setup
    const alchemyList = new AlchemyList()
    const display = new Viewer()
    let inputValue, ingredient

    // Listeners
    // Main ingredient input
    display.ingredientInput.addEventListener("change", (e) => {
        inputValue = display.ingredientInput.value
        ingredient = alchemyList.getIngredient(inputValue)

        alchemyList.getRecommendedCombination(ingredient)
        display.update(ingredient, alchemyList)
    })

    // Each of the effect inputs
    display.inputEffects.forEach((input, i) => {
        input.addEventListener("change", (event) => {
            inputValue = display.ingredientInput.value
            ingredient = alchemyList.getIngredient(inputValue)
            ingredient.addEffect(event.target.value, i)

            alchemyList.saveAlchemyListToStorage()
            display.update(ingredient, alchemyList)
        })
    })

    // Failed Combinations
    document.getElementById("failedCombinationInput").addEventListener("change", (e) => {
        inputValue = display.ingredientInput.value
        let otherIngredient = alchemyList.getIngredient(display.failedCombinationInput.value)

        ingredient = alchemyList.getIngredient(inputValue)


        ingredient.addFailedCombination(otherIngredient)
        otherIngredient.addFailedCombination(ingredient)

        alchemyList.saveAlchemyListToStorage()
        display.update(ingredient, alchemyList)

    })
    document.getElementById("failedCombinations").addEventListener("click", (e) => {
        inputValue = display.ingredientInput.value
        let identifier, ingredientObject, otherIngredient

        ingredient = alchemyList.getIngredient(inputValue)
        ingredientObject = alchemyList.getIngredient(inputValue)
        otherIngredient = alchemyList.getIngredientById(e.target.id.split("-")[1])

        ingredientObject.removeFailedCombination(otherIngredient)
        otherIngredient.removeFailedCombination(ingredientObject)

        display.update(ingredient, alchemyList)
        alchemyList.saveAlchemyListToStorage()
    })

    // Recommended
    document.getElementById("nextMatch").addEventListener("click", () => {
        document.getElementById("bestMatch").innerHTML = `The best match is ${alchemyList.recommendations.next().value}`
    })

    // Get data from local storage
    alchemyList.getAlchemyListFromStorage("AlchemyList")

    // If first time using, generate a new alchemyList
    if (alchemyList.isEmpty()) {
        alchemyList.createAlchemyList()
    }






    const removeListSet = new Set(["Abecean Longfin", "Ancestor Moth Wing", "Ash Creep Cluster", "Ash Hopper Jelly", "Ashen Grass Pod", "Bear Claws", "Bee", "Beehive Husk", "Bleeding Crown", "Blisterwort", "Blue Butterfly Wing"])

    const tempSet = new Set(ingredients)

    removeListSet.forEach( (ingredient) => { tempSet.delete(ingredient) })

    return tempSet
}






main()
