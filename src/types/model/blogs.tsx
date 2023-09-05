export interface BlogState {
    rows: Array<BlogModel>
	total: number | undefined
}

export interface BlogModel{
     id :string,
     title:string,
     image:string,
     description :string 
     content:string
}

export interface BlogResponse {
	total: number
	rows: Array<BlogModel>
}