package repository

import (
	"context"
	"time"

	"github.com/thebravebyte/backend/internal/database"
	"github.com/thebravebyte/backend/internal/models"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type ArticleRepository struct {
	collection *mongo.Collection
}

func NewArticleRepository() *ArticleRepository {
	return &ArticleRepository{
		collection: database.DB.Collection("articles"),
	}
}

func (r *ArticleRepository) GetAll(ctx context.Context, page, limit int) ([]models.Article, int64, error) {
	skip := (int64(page) - 1) * int64(limit)
	opts := options.Find().SetLimit(int64(limit)).SetSkip(skip).SetSort(bson.D{{Key: "created_at", Value: -1}})

	// Count total documents
	total, err := r.collection.CountDocuments(ctx, bson.D{})
	if err != nil {
		return nil, 0, err
	}

	cursor, err := r.collection.Find(ctx, bson.D{}, opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var articles []models.Article
	if err = cursor.All(ctx, &articles); err != nil {
		return nil, 0, err
	}

	return articles, total, nil
}

func (r *ArticleRepository) GetBySlug(ctx context.Context, slug string) (*models.Article, error) {
	var article models.Article
	err := r.collection.FindOne(ctx, bson.D{{Key: "slug", Value: slug}}).Decode(&article)
	if err != nil {
		return nil, err
	}
	return &article, nil
}

func (r *ArticleRepository) GetByID(ctx context.Context, id string) (*models.Article, error) {
	oid, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}
	var article models.Article
	err = r.collection.FindOne(ctx, bson.D{{Key: "_id", Value: oid}}).Decode(&article)
	if err != nil {
		return nil, err
	}
	return &article, nil
}

func (r *ArticleRepository) Create(ctx context.Context, article *models.Article) error {
	article.CreatedAt = time.Now()
	article.UpdatedAt = time.Now()
	res, err := r.collection.InsertOne(ctx, article)
	if err != nil {
		return err
	}
	article.ID = res.InsertedID.(bson.ObjectID)
	return nil
}

func (r *ArticleRepository) Update(ctx context.Context, id string, updateData bson.M) error {
	oid, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	updateData["updated_at"] = time.Now()
	update := bson.D{{Key: "$set", Value: updateData}}

	_, err = r.collection.UpdateOne(ctx, bson.D{{Key: "_id", Value: oid}}, update)
	return err
}

func (r *ArticleRepository) Delete(ctx context.Context, id string) error {
	oid, err := bson.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = r.collection.DeleteOne(ctx, bson.D{{Key: "_id", Value: oid}})
	return err
}
