import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '../../types/reviews';
import reviewService from '../../services/review.service';

interface ProductReviewsProps {
  reviews: Review[];
  productId: string;
}

export const ProductReviews = ({ reviews, productId }: ProductReviewsProps) => {
  const [localReviews, setLocalReviews] = useState(reviews);

  // Calculer la moyenne des notes
  const averageRating = localReviews.reduce((acc, review) => acc + review.rating, 0) / localReviews.length;
  
  // Calculer la distribution des notes
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const count = localReviews.filter(review => review.rating === 5 - i).length;
    return {
      rating: 5 - i,
      count,
      percentage: (count / localReviews.length) * 100
    };
  });

  const handleHelpful = async (reviewId: string) => {
    try {
      await reviewService.markReviewAsHelpful(reviewId);
      setLocalReviews(prevReviews =>
        prevReviews.map(review =>
          review.id === reviewId
            ? { ...review, helpful: review.helpful + 1 }
            : review
        )
      );
    } catch (error) {
      console.error('Error marking review as helpful:', error);
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête des avis */}
      <div className="flex items-start gap-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-dark-gray">{averageRating.toFixed(1)}</div>
          <div className="flex items-center justify-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(averageRating)
                    ? 'fill-soft-gold text-soft-gold'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {localReviews.length} avis
          </div>
        </div>

        <div className="flex-1">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-2 mb-1">
              <div className="w-12 text-sm text-gray-600">{rating} étoiles</div>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-soft-gold"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-12 text-sm text-gray-600">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-6">
        {localReviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center gap-4 mb-3">
              {review.userAvatar ? (
                <img
                  src={review.userAvatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 font-medium">
                    {review.userName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium">{review.userName}</div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-soft-gold text-soft-gold'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <button
              onClick={() => handleHelpful(review.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Utile ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};