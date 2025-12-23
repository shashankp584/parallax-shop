import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Review } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList = ({ reviews }: ReviewListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No reviews yet. Be the first to review this product!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="border-b pb-6 last:border-b-0"
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold">{review.userName}</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-primary text-primary'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewList;
