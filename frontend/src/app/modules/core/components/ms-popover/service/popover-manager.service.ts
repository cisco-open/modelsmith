import { Injectable } from '@angular/core';
import { PopoverRef } from '../popover.ref';

// The PopoverManagerService is responsible for managing all active popovers within the application. It allows popovers to be registered and tracked by a unique id so that they can be closed or managed globally. This service provides the ability to open, close, and check the status of popovers using these unique identifiers.
//
// Key Responsibilities:
//
// Register and Track Active Popovers: Registers each popover with a unique id and stores it in a Map, allowing popovers to be managed globally.
// Close Popovers by ID: Provides a method to close a specific popover by its id.
// Close All Popovers: Allows closing all currently active popovers.
// Check Active Popovers: Provides a utility to check whether a specific popover is active by its id.

@Injectable({
	providedIn: 'root'
})
export class PopoverManagerService {
	private activePopovers: Map<string, PopoverRef> = new Map();

	registerPopover(id: string, popoverRef: PopoverRef): void {
		this.activePopovers.set(id, popoverRef);
	}

	deregisterPopover(id: string): void {
		this.activePopovers.delete(id);
	}

	closePopoverById(id: string): void {
		const popoverRef = this.activePopovers.get(id);
		if (popoverRef) {
			popoverRef.close();
			this.activePopovers.delete(id);
		}
	}

	closeAllPopovers(): void {
		this.activePopovers.forEach((popover) => popover.close());
		this.activePopovers.clear();
	}

	hasActivePopover(id: string): boolean {
		return this.activePopovers.has(id);
	}
}
