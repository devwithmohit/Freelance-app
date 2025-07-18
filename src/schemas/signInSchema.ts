import {z} from "zod"

export const signInSchema = z.object({
    // identifier
    identifier:z.string(),
    password:z.string(),

})