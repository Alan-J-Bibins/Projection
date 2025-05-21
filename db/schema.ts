import { sqliteTable, text, integer, uniqueIndex } from "drizzle-orm/sqlite-core";
import { createId } from '@paralleldrive/cuid2';
import { name } from "drizzle-orm";

export const user = sqliteTable("user", {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: integer('email_verified', { mode: 'boolean' }).$defaultFn(() => false).notNull(),
    image: text('image'),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => /* @__PURE__ */ new Date()).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => /* @__PURE__ */ new Date()).notNull()
});

export const session = sqliteTable("session", {
    id: text('id').primaryKey(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    token: text('token').notNull().unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' })
});

export const account = sqliteTable("account", {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
    refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
    scope: text('scope'),
    password: text('password'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

export const verification = sqliteTable("verification", {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).$defaultFn(() => /* @__PURE__ */ new Date())
});

export const projectMember = sqliteTable("projectMember", {
    id: text('id').$defaultFn(() => createId()).primaryKey(),
    userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
    projectId: text('projectId').notNull().references(() => project.id, { onDelete: 'cascade' }),
    role: text('role', {enum: ['ADMIN', 'MEMBER']}).notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => ({
    userProjectUnique: uniqueIndex('user_project_unique').on(table.userId, table.projectId)
}));

export const project = sqliteTable("project", {
    id: text('id').$defaultFn(() => createId()).primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const board = sqliteTable("board", {
    id: text('id').$defaultFn(() => createId()).primaryKey(),
    projectId: text('projectId').notNull().references(() => project.id, { onDelete: 'cascade' }).unique(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const column = sqliteTable("column", {
    id: text('id').$defaultFn(() => createId()).primaryKey(),
    name: text('name').notNull(),
    boardId: text('boardId').notNull().references(() => board.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})

export const task = sqliteTable("task", {
    id: text('id').$defaultFn(() => createId()).primaryKey(),
    name: text('name').notNull(),
    desc: text('desc'),
    tags: text('tags'),
    columnId: text('columnId').notNull().references(() => column.id, { onDelete: 'cascade' }),
    assignedMemberId: text('assignedMemberId').notNull().references(() => projectMember.id, { onDelete: 'cascade' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
})
