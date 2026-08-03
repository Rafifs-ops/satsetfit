<script setup>
import { useToastStore } from '@/stores/toast';
import { storeToRefs } from 'pinia';

const toastStore = useToastStore();
const { toasts } = storeToRefs(toastStore);

function getIconClass(type) {
    switch (type) {
        case 'success':
            return 'bi bi-check-circle-fill text-emerald';
        case 'error':
            return 'bi bi-x-circle-fill text-rose';
        case 'warning':
            return 'bi bi-exclamation-triangle-fill text-amber';
        case 'info':
        default:
            return 'bi bi-info-circle-fill text-cyan';
    }
}

function dismiss(id) {
    toastStore.removeToast(id);
}
</script>

<template>
    <div class="toast-container-wrapper" aria-live="polite" aria-atomic="true">
        <TransitionGroup name="toast-slide" tag="div" class="toast-list">
            <div
                v-for="toast in toasts"
                :key="toast.id"
                class="toast-card"
                :class="`toast-${toast.type}`"
            >
                <div class="toast-content">
                    <div class="toast-icon-wrapper">
                        <i :class="getIconClass(toast.type)" class="toast-icon"></i>
                    </div>
                    <div class="toast-text-wrapper">
                        <h6 v-if="toast.title" class="toast-title">{{ toast.title }}</h6>
                        <p class="toast-message">{{ toast.message }}</p>
                    </div>
                    <button
                        type="button"
                        class="toast-close-btn"
                        @click="dismiss(toast.id)"
                        aria-label="Tutup notifikasi"
                    >
                        <i class="bi bi-x"></i>
                    </button>
                </div>
                <div
                    v-if="toast.duration > 0"
                    class="toast-progress-bar"
                    :style="{ animationDuration: `${toast.duration}ms` }"
                ></div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.toast-container-wrapper {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 380px;
    width: calc(100vw - 48px);
    pointer-events: none;
}

.toast-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
}

.toast-card {
    pointer-events: auto;
    position: relative;
    overflow: hidden;
    background: rgba(15, 23, 42, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    box-shadow:
        0 10px 30px -5px rgba(0, 0, 0, 0.4),
        0 0 15px rgba(163, 255, 214, 0.08);
    color: #f8fafc;
    padding: 14px 16px;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
}

.toast-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.35rem;
    line-height: 1;
    margin-top: 1px;
}

.text-emerald {
    color: #34d399;
    filter: drop-shadow(0 0 6px rgba(52, 211, 153, 0.4));
}

.text-rose {
    color: #f87171;
    filter: drop-shadow(0 0 6px rgba(248, 113, 113, 0.4));
}

.text-amber {
    color: #fbbf24;
    filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.4));
}

.text-cyan {
    color: #38bdf8;
    filter: drop-shadow(0 0 6px rgba(56, 189, 248, 0.4));
}

.toast-text-wrapper {
    flex: 1;
    min-width: 0;
}

.toast-title {
    font-size: 0.925rem;
    font-weight: 700;
    margin: 0 0 2px 0;
    color: #ffffff;
    letter-spacing: -0.01em;
}

.toast-message {
    font-size: 0.85rem;
    margin: 0;
    color: rgba(241, 245, 249, 0.88);
    line-height: 1.4;
    word-break: break-word;
}

.toast-close-btn {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 0;
    margin: -4px -4px 0 0;
    font-size: 1.4rem;
    line-height: 1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease, background-color 0.2s ease;
}

.toast-close-btn:hover {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.1);
}

/* Toast type border accents */
.toast-success {
    border-left: 4px solid #34d399;
}

.toast-error {
    border-left: 4px solid #f87171;
}

.toast-warning {
    border-left: 4px solid #fbbf24;
}

.toast-info {
    border-left: 4px solid #38bdf8;
}

/* Progress bar animation */
.toast-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.8));
    animation: toastProgress linear forwards;
    transform-origin: left;
}

.toast-success .toast-progress-bar {
    background: #34d399;
}

.toast-error .toast-progress-bar {
    background: #f87171;
}

.toast-warning .toast-progress-bar {
    background: #fbbf24;
}

.toast-info .toast-progress-bar {
    background: #38bdf8;
}

@keyframes toastProgress {
    from {
        transform: scaleX(1);
    }
    to {
        transform: scaleX(0);
    }
}

/* Vue Transition Group Animations */
.toast-slide-enter-active {
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-slide-leave-active {
    transition: all 0.25s cubic-bezier(0.7, 0, 0.84, 0);
}

.toast-slide-enter-from {
    opacity: 0;
    transform: translateX(40px) scale(0.95);
}

.toast-slide-leave-to {
    opacity: 0;
    transform: translateX(40px) scale(0.9);
}

.toast-slide-move {
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
