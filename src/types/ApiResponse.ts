import { Messages } from "@/Models/User";
export interface ApiResponse{
    success : boolean;
    message: string;
    isAcceptingMessage?: boolean;
    messages?: Array<Messages>
}