import { Subject } from "rxjs";
import { Owner } from "./owner.model";
export class OwnerService {
    ownersChanged = new Subject<Owner[]>();
    private owners: Owner[];
    private ownerId: number;

    constructor(){}

    setOwnerId(ownerId: number) {
        this.ownerId = ownerId;
    }

    getOwnerId() {
        return this.ownerId;
    }

    setOwner(owners: Owner[]) {
        this.owners = owners;
        this.ownersChanged.next(this.owners.slice());
    }

    getOwners(){
        return this.owners.slice();
    }

    getOwner(id: number){
        for(let i of this.owners) {
            if(id === i.id){
                return i;
            }
        }
    }

    addOwner(owner: Owner) {
        this.owners.push(owner);
        this.ownersChanged.next(this.owners.slice());
    }

    updateOwner(index: number, newOwner: Owner) {
        this.owners[index] = newOwner;
        this.ownersChanged.next(this.owners.slice());
    }

    deleteOwner(index: number) {
        this.owners.splice(index, 1);
        this.ownersChanged.next(this.owners.slice());
    }
}