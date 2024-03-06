export type QuoteType =  {
    _id:          string;
    content:      string;
    author:       string;
    tags:         string[];
    authorSlug:   string;
    dateAdded:    string;
    dateModified: string;
    isFavorite?: boolean;
}
