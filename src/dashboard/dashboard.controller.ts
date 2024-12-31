
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuardAdmin } from 'src/admin/authAdmin/authAdmin.guard';
import { Feedback } from 'src/entities/feedback.entity';
import { FeedbackService } from 'src/feedback/feedback.service';
import { FriendService } from 'src/friend/friend.service';
import { UsersService } from 'src/users/users.service';
import { eventService } from 'src/event/event.service';
import { JobPostsService } from 'src/job-post/job-posts.service';
import { ForumService } from 'src/forum/forum.service';
import { PostsService } from 'src/posts/posts.service';
import { messageService } from 'src/message/message.service';
import { CommentsService } from 'src/comments/comments.service';
import { walletService } from 'src/wallet/wallet.service';
import { SubscriptionService } from 'src/subscription/subscription.service';


@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly usersService: UsersService,
        private readonly feedbackService: FeedbackService,
        private readonly friendService: FriendService,
        private readonly eventService: eventService,
        private readonly jobPostsService: JobPostsService,
        private readonly forumService: ForumService,
        private readonly postsService: PostsService,
        private readonly messageService: messageService,
        private readonly commentsService: CommentsService,
        private readonly walletService: walletService,
        private readonly subscriptionService: SubscriptionService,
    ) { }

    @UseGuards(AuthGuardAdmin)
    @Get('/totalusers')
    async getTotalUsers(): Promise<{ totalUsers: number }> {
        const totalUsers = await this.usersService.getTotalUsers();
        return { totalUsers };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/totalfeedbacks')
    async getTotalFeedbacks(): Promise<{ totalFeedbacks: number }> {
        const totalFeedbacks = await this.feedbackService.getTotalFeedbacks();
        return { totalFeedbacks };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/showfeedbacks')
    async findAll(): Promise<Feedback[]> {
        return this.feedbackService.findAll();
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-pending-friend-requests')
    async getTotalPendingFriendRequests(): Promise<{ totalPendingFriendRequests: number }> {
        const totalPendingFriendRequests = await this.friendService.getTotalPendingFriendRequests();
        return { totalPendingFriendRequests };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-accepted-friend-requests')
    async getTotalAcceptedFriendRequests(): Promise<{ totalAcceptedFriendRequests: number }> {
        const totalAcceptedFriendRequests = await this.friendService.getTotalAcceptedFriendRequests();
        return { totalAcceptedFriendRequests };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/totalevents')
    async getTotalEvents(): Promise<{ totalEvents: number }> {
        const totalEvents = await this.eventService.countEvents();
        return { totalEvents };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/totaljobposts')
    async getTotalJobPosts(): Promise<{ totalJobPosts: number }> {
        const totalJobPosts = await this.jobPostsService.countJobPosts();
        return { totalJobPosts };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/totalforumposts')
    async getTotalForumPosts(): Promise<{ totalForumPosts: number }> {
        const totalForumPosts = await this.forumService.countForumPosts();
        return { totalForumPosts };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/totalposts')
    async getTotalPosts(): Promise<{ totalPosts: number }> {
        const totalPosts = await this.postsService.countPosts();
        return { totalPosts };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-likes')
    async getTotalLikes(): Promise<{ totalLikes: number }> {
        const totalLikes = await this.postsService.countLikes();
        return { totalLikes };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-dislikes')
    async getTotalDislikes(): Promise<{ totalDislikes: number }> {
        const totalDislikes = await this.postsService.countDislikes();
        return { totalDislikes };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-comments')
    async getTotalComments(): Promise<{ totalComments: number }> {
        const totalComments = await this.commentsService.countComments();
        return { totalComments };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-expected-revenue')
    async getTotalWalletBalance(): Promise<{ totalWalletBalance: number }> {
        const totalWalletBalance = await this.walletService.countTotalBalance();
        return { totalWalletBalance };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-subscribers')
    async getTotalSubscribers(): Promise<{ totalSubscribers: number }> {
        const totalSubscribers = await this.subscriptionService.countTotalSubscribers();
        return { totalSubscribers };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-revenue')
    async getTotalAmountAdded(): Promise<{ totalAmountAdded: number }> {
        const totalAmountAdded = await this.subscriptionService.countTotalAmountAdded();
        return { totalAmountAdded };
    }

    @UseGuards(AuthGuardAdmin)
    @Get('/total-loss')
    async getTotalLoss(): Promise<{ totalLoss: number }> {
        const totalLoss = await this.subscriptionService.calculateTotalLoss();
        return { totalLoss };
    }
}
