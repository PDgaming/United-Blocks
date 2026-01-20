import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	serverStatus: defineTable({
		name: v.string(),
		lastSeen: v.number(),
		mcStatus: v.boolean()
	})
});
