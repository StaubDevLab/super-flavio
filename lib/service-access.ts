export function canManageServices(session: {
    user?: {
        email?: string | null;
    };
} | null) {
    const allowed = (process.env.ALLOWED_EMAILS || process.env.NEXT_PUBLIC_ALLOWED_EMAILS || "").split(",").map(email => email.trim().toLowerCase()).filter(Boolean);
    return Boolean(session?.user?.email && allowed.includes(session.user.email.toLowerCase()));
}
