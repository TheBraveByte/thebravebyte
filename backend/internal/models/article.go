package models

import (
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

type Article struct {
	ID          bson.ObjectID `bson:"_id,omitempty" json:"id"`
	Title       string        `bson:"title" json:"title"`
	Slug        string        `bson:"slug" json:"slug"`
	Excerpt     string        `bson:"excerpt" json:"excerpt"`
	Content     string        `bson:"content" json:"content"` // Stored as JSON string or plain text
	CoverImage  string        `bson:"cover_image" json:"coverImage"`
	Published   bool          `bson:"published" json:"published"`
	PublishedAt *time.Time    `bson:"published_at" json:"publishedAt"`
	Author      string        `bson:"author" json:"author"`
	Views       int           `bson:"views" json:"views"`
	CreatedAt   time.Time     `bson:"created_at" json:"createdAt"`
	UpdatedAt   time.Time     `bson:"updated_at" json:"updatedAt"`
}
