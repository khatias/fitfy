export interface InputProps {
label?:string;
type?:string;
placeholder?:string;
value?:string;
onChange?:(e: React.ChangeEvent<HTMLInputElement>) =>void;
name:string;
required?: boolean;
icon?
error?
id?
}