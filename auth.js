(() => {
    const REMEMBER_SESSION_KEY = "tameenRememberSession";

    function getClient() {
        if (!window.supabaseClient) {
            throw new Error("Supabase client is not available. Load supabase.js before auth.js.");
        }

        return window.supabaseClient;
    }

    async function getSession() {
        const { data, error } = await getClient().auth.getSession();

        if (error) {
            return null;
        }

        return data.session;
    }

    async function requireAuth(options = {}) {
        const redirectTo = options.redirectTo || "index.html";
        const session = await getSession();

        if (!session) {
            window.location.href = redirectTo;
            return null;
        }

        return session;
    }

    function setSessionPersistence(shouldPersist) {
        if (shouldPersist) {
            localStorage.setItem(REMEMBER_SESSION_KEY, "true");
            return;
        }

        localStorage.removeItem(REMEMBER_SESSION_KEY);
    }

    async function signOutAndRedirect(options = {}) {
        const redirectTo = options.redirectTo || "index.html";
        await getClient().auth.signOut();
        window.location.href = redirectTo;
    }

    window.auth = {
        getSession,
        requireAuth,
        setSessionPersistence,
        signOutAndRedirect
    };
})();
