import { getAllFilters } from "./repos.filter";
import { getFilterById } from "./repos.filter";

async function main() {
    console.log(await getAllFilters());
    console.log(await getFilterById({id: '65963'}));
}

main();