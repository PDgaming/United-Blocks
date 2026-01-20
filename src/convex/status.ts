import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const reportStatus = mutation({
	args: {
		name: v.string(),
		mcStatus: v.boolean()
	},
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query('serverStatus')
			.filter((q) => q.eq(q.field('name'), args.name))
			.unique();

		if (existing) {
			await ctx.db.patch(existing._id, { lastSeen: Date.now(), mcStatus: args.mcStatus });
		} else {
			await ctx.db.insert('serverStatus', { ...args, lastSeen: Date.now() });
		}
	}
});

export const getStatus = query({
	handler: async (ctx) => {
		const status = await ctx.db.query('serverStatus').unique();
		if (!status) {
			return { pcOnline: false, mcOnline: false };
		}

		const isPcOnline = Date.now() - status.lastSeen < 30000;
		return {
			pcOnline: isPcOnline,
			mcOnline: isPcOnline && status.mcStatus,
			lastSeen: status.lastSeen
		};
	}
});
